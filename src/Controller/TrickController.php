<?php

namespace App\Controller;

use App\Entity\Media;
use App\Entity\Trick;
use App\Entity\User;
use App\Form\CommentType;
use App\Form\MediaType;
use App\Form\TrickType;
use App\Repository\CommentRepository;
use App\Repository\TrickRepository;
use App\Service\MediaService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\PersistentCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\String\Slugger\SluggerInterface;

class TrickController extends AbstractController
{
    private $trickRepository;

    public function __construct(TrickRepository $trickRepository)
    {
        $this->trickRepository = $trickRepository;
    }

    /**
     * @Route("/tricks/new", name="trick_create")
     * @IsGranted("ROLE_USER")
     */
    public function create(Request $request, MediaService $mediaService, EntityManagerInterface $em, SluggerInterface $slugger): Response
    {
        $form = $this->createForm(TrickType::class);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            /** @var User $user */
            $user = $this->getUser();
            /** @var Trick $trick */
            $trick = $form->getData();

            $trick
                ->setAuthor($user)
                ->setSlug(strtolower($slugger->slug($trick->getName())));

            $medias = $form->get('medias');

            foreach ($medias as $media) {
                $name = $media->get('name')->getData();
                $type = $media->get('type')->getData();
                $source = $media->get('source')->getData();
                $image = $media->get('image')->getData();

                if($type === MediaType::TYPE_IMAGE) {
                    $imageMedia = $mediaService->addImage($image, $name, $this->getParameter('images_directory'));

                    if($imageMedia instanceof Media) {
                        $trick->addMedia($imageMedia);
                    }
                }
                elseif ($type === MediaType::TYPE_VIDEO) {
                    $videoMedia = $mediaService->addVideo($name, $source);

                    if($videoMedia instanceof Media) {
                        $trick->addMedia($videoMedia);
                    }
                }
            }

            $this->trickRepository->add($trick, true);

            $this->addFlash('success', "La figure « " . $trick->getName() . " » a bien été créée.");

            return $this->redirectToRoute('homepage', [
                '_fragment' => 'all-tricks'
            ]);
        }

        return $this->render('trick/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/tricks/{slug}", name="trick_show")
     * 
     * @param string $slug
     */
    public function show($slug): Response
    {
        $trick = $this->trickRepository->findOneBy([
            'slug' => $slug
        ]);

        if(!$trick) {
            throw $this->createNotFoundException("Cette figure n'existe pas !");
        }

        $form = $this->createForm(CommentType::class, null, [
            'action' => $this->generateUrl('trick_comment_add', [
                'id' => $trick->getId()
            ])
        ]);

        $comments = $trick->getComments()->slice(0, 5);

        return $this->render('trick/show.html.twig', [
            'trick' => $trick,
            'commentForm' => $form->createView(),
            'comments' => $comments,
            'found_comments' => $trick->getComments()->count(),
            'next_comments_page' => 1,
            'max_comments_per_page' => CommentRepository::MAX_PER_PAGE
        ]);
    }

    /**
     * @Route("/tricks", name="trick_all")
     */
    public function allTricks(): Response
    {
        return $this->redirectToRoute('homepage', [
            '_fragment' => 'all-tricks'
        ]);
    }

    /**
     * @Route("/ajax/tricks", name="ajax_trick_getTricks", methods={"GET"}, options={"expose"=true})
     */
    public function getTricks(Request $request): Response
    {
        if (!$request->isXmlHttpRequest()) {
            return new JsonResponse(['message' => 'Accessible uniquement en Ajax !'], 400);
        }

        if(!$request->get('page')) {
            return new JsonResponse(['message' => 'Une erreur est survenue !'], 500);
        }

        $page = intval($request->get('page'));

        $tricks = $this->trickRepository->findByPage($page);

        $datas['view'] = $this->renderView('trick/ajax/tricks.html.twig', [
            'tricks' => $tricks,
        ]);

        $datas['found_items'] = $tricks->count();
        $datas['next_page'] = $page + 1;
        $datas['max_per_page'] = TrickRepository::MAX_PER_PAGE;

        return new JsonResponse($datas);
    }

    /**
     * @Route("/tricks/{trick_id}/delete", name="trick_delete")
     * 
     * @param int $trick_id
     */
    public function delete($trick_id): Response
    {
        $trick = $this->trickRepository->find($trick_id);

        if(!$trick) {
            throw $this->createNotFoundException("Cette figure n'existe pas !");
        }

        $this->denyAccessUnlessGranted('TRICK_DELETE', $trick);

        $this->trickRepository->remove($trick, true);

        $this->addFlash('success', "La figure a bien été supprimée.");

        return $this->redirectToRoute("homepage");
    }

    /**
     * @Route("/tricks/{trick_id}/edit", name="trick_edit")
     * 
     * @param int $trick_id
     */
    public function edit($trick_id, Request $request, SluggerInterface $slugger, MediaService $mediaService, EntityManagerInterface $em): Response
    {
        $trick = $this->trickRepository->find($trick_id);

        if(!$trick) {
            $this->addFlash("info", "Cette figure n'existe pas. Vous pouvez en créer une en remplissant le formulaire ci-dessous.");
            return $this->redirectToRoute("trick_create");
        }

        $this->denyAccessUnlessGranted('TRICK_EDIT', $trick);

        $form = $this->createForm(TrickType::class, $trick);

        $form->get('medias')->setData($trick->getMedias());

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $trick
                ->setUpdatedAt(new \DateTimeImmutable())
                ->setSlug(strtolower($slugger->slug($trick->getName())))
            ;

            $medias = $form->get('medias');

            foreach ($medias as $media) {
                /** @var Media $mediaEntity */
                $mediaEntity = $media->getData();

                $name = $mediaEntity->getName();
                $type = $mediaEntity->getType();
                $source = $mediaEntity->getSource();
                $image = $media->get('image')->getData();

                if($type === MediaType::TYPE_IMAGE) {
                    $mediaEntity->setSource(null);

                    if($image) {
                        $imageMedia = $mediaService->addImage($image, $name, $this->getParameter('images_directory'));

                        if($imageMedia instanceof Media) {
                            if($mediaEntity->getFilename()) {
                                $mediaService->removeFile($mediaEntity);
                            }

                            $mediaEntity->setFilename($imageMedia->getFilename());
                        }

                        if(!$mediaEntity->getId()) {
                            $trick->addMedia($mediaEntity);
                        }
                    }
                }
                elseif ($type === MediaType::TYPE_VIDEO) {
                    $mediaEntity->setFilename(null);

                    if(!$mediaEntity->getId()) {
                        $videoMedia = $mediaService->addVideo($name, $source);

                        if($videoMedia instanceof Media) {
                            $trick->addMedia($videoMedia);
                        }
                    }
                }
            }

            /** @var PersistentCollection $updatedMedias */
            $updatedMedias = $medias->getData();
            foreach ($trick->getMedias() as $existingMedia) {
                if(false === $updatedMedias->contains($existingMedia) && $existingMedia->getId()) {
                    $trick->getMedias()->removeElement($existingMedia);
                    $em->remove($existingMedia);
                }
            }

            $em->flush();

            $this->addFlash('success', "La figure a bien été mise à jour !");

            $this->redirectToRoute('trick_edit', [
                'trick_id' => $trick->getId()
            ]);
        }

        return $this->render('trick/edit.html.twig', [
            'trick' => $trick,
            'form' => $form->createView()
        ]);
    }
}
