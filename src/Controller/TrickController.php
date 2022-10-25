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

            $medias = $form->get('medias')->getData();

            /** @var Media $media */
            foreach ($medias as $media) {
                $name = $media->getName();
            }
        }

        return $this->render('trick/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
