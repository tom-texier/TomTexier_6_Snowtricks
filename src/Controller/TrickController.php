<?php

namespace App\Controller;

use App\Entity\Trick;
use App\Entity\User;
use App\Form\MediaType;
use App\Form\TrickType;
use App\Repository\TrickRepository;
use App\Service\MediaService;
use Doctrine\ORM\EntityManagerInterface;
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
     * @Route("/trick/new", name="trick_create")
     * @isGranted("ROLE_USER")
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

                    if($imageMedia != null) {
                        $trick->addMedia($imageMedia);
                    }
                }
                elseif ($type === MediaType::TYPE_VIDEO) {
                    $videoMedia = $mediaService->addVideo($name, $source);

                    if($videoMedia != null) {
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
     */
    public function show($slug)
    {
        $trick = $this->trickRepository->findOneBy([
            'slug' => $slug
        ]);

        if(!$trick) {
            throw $this->createNotFoundException("Cette figure n'existe pas !");
        }

        return $this->render('trick/show.html.twig', [
            'trick' => $trick,
        ]);
    }

    /**
     * @Route("/tricks", name="trick_all")
     */
    public function allTricks()
    {
        return $this->redirectToRoute('homepage', [
            '_fragment' => 'all-tricks'
        ]);
    }

    /**
     * @Route("/ajax/tricks", name="ajax_json_tricks", methods={"GET"}, options={"expose"=true})
     */
    public function getTricks(Request $request, TrickRepository $trickRepository)
    {
        if (!$request->isXmlHttpRequest()) {
            return new JsonResponse(['message' => 'Accessible uniquement en Ajax !'], 400);
        }

        if(!$request->get('page')) {
            return new JsonResponse(['message' => 'Une erreur est survenue !'], 500);
        }

        $page = intval($request->get('page'));

        $tricks = $trickRepository->findByPage($page);

        $datas['view'] = $this->renderView('trick/ajax/tricks.html.twig', [
            'tricks' => $tricks,
        ]);

        $datas['found_items'] = $tricks->count();
        $datas['next_page'] = intval($page) + 1;
        $datas['max_per_page'] = TrickRepository::MAX_PER_PAGE;

        return new JsonResponse($datas);
    }
}
