<?php

namespace App\Controller;

use App\Entity\Media;
use App\Entity\Trick;
use App\Entity\User;
use App\Form\MediaType;
use App\Form\TrickType;
use App\Service\MediaService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\String\Slugger\SluggerInterface;

class TrickController extends AbstractController
{
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

            $em->persist($trick);
            $em->flush();
            $this->addFlash('success', "La figure " . $trick->getName() . " a bien été créée.");

            return $this->redirectToRoute('homepage', [
                '_fragment' => 'all-tricks'
            ]);
        }

        return $this->render('trick/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
