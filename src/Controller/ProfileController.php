<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ProfileType;
use App\Service\MediaService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfileController extends AbstractController
{
    /**
     * @Route("/mon-compte", name="profile_index")
     */
    public function index(Request $request, EntityManagerInterface $em, MediaService $mediaService): Response
    {
        $form = $this->createForm(ProfileType::class, $this->getUser());
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            /** @var User $user */
            $user = $this->getUser();
            /** @var User $datas */
            $datas = $form->getData();

            $user
                ->setLastname($datas->getLastname())
                ->setFirstname($datas->getFirstname());

            $image = $form->get('avatarImage')->getData();

            if($image) {
                $name = $user->getLastname() . "_" . $user->getFirstname() . "_profile";
                $imageMedia = $mediaService->addImage($image, $name, $this->getParameter('images_directory'));

                if($imageMedia != null) {
                    $user->setAvatarImage($imageMedia);
                }
            }

            $em->flush();
            $this->addFlash('success', "Votre profil a bien été mis à jour");
        }

        return $this->render('profile/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
