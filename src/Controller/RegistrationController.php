<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use App\Service\JWTService;
use App\Service\SendMailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/inscription", name="registration_register")
     */
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, SendMailService $mailService, JWTService $jwt): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
            $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            $entityManager->persist($user);
            $entityManager->flush();
            
            $header = [
                'alg' => 'HS256',
                'typ' => 'JWT'
            ];

            $payload = [
                'user_id' => $user->getId()
            ];

            $token = $jwt->generate($header, $payload, $this->getParameter('app.jwt_secret'));

            $mailService->send(
                'noreply@snowtricks.fr',
                $user->getEmail(),
                'Validation de votre adresse mail',
                'register.html.twig',
                compact('user', 'token')
            );

            return $this->redirectToRoute('homepage');
        }

        return $this->render('registration/register.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/validation/{token}", name="registration_validation")
     */
    public function validation($token, JWTService $jwt, UserRepository $userRepository, EntityManagerInterface $em): Response
    {
        if($jwt->isValid($token, $this->getParameter('app.jwt_secret'))) {
            $paylaod = $jwt->getPayload($token);
            $user = $userRepository->find($paylaod['user_id']);

            if(!$user) {
                $this->addFlash('error', "Une erreur est survenue. Veuillez contacter l'administrateur du site.");
                return $this->redirectToRoute("security_login");
            }

            if($user->isVerified()) {
                $this->addFlash('info', "Votre adresse mail a déjà été vérifiée. Vous pouvez vous connecter.");
                return $this->redirectToRoute("security_login");
            }

            $user->setVerified(true);
            $em->flush();

            $this->addFlash('info', "Votre adresse mail a bien été vérifié. Vous pouvez maintenant vous connecter.");
            return $this->redirectToRoute("security_login");
        }

        $this->addFlash('error', "Ce lien semble être invalide ou a expiré.");

        return $this->redirectToRoute("security_login");
    }

    /**
     * @Route("/resendValidation/{email}", name="registration_resend_validation")
     */
    public function resendValidation($email, JWTService $jwt, SendMailService $mailService, UserRepository $userRepository): Response
    {
        $user = $userRepository->findOneBy(['email' => $email]);

        if(!$user) {
            $this->addFlash('error', "Cette adresse mail ne correspond à aucun compte enregistré sur notre site.");
            return $this->redirectToRoute("security_login");
        }

        if($user->isVerified()) {
            $this->addFlash('info', "Votre adresse mail a déjà été vérifiée. Vous pouvez vous connecter.");
            return $this->redirectToRoute("security_login");
        }

        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ];

        $payload = [
            'user_id' => $user->getId()
        ];

        $token = $jwt->generate($header, $payload, $this->getParameter('app.jwt_secret'));

        $mailService->send(
            'noreply@snowtricks.fr',
            $user->getEmail(),
            'Validation de votre adresse mail',
            'register.html.twig',
            compact('user', 'token')
        );

        $this->addFlash('info', "Un email vient d'être envoyé à l'adresse mail renseignée.");
        return $this->redirectToRoute("security_login");
    }
}
