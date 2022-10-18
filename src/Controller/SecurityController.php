<?php

namespace App\Controller;

use App\Form\ResetPasswordRequestType;
use App\Form\ResetPasswordType;
use App\Repository\UserRepository;
use App\Service\SendMailService;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/connexion", name="security_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
         if ($this->getUser()) {
             return $this->redirectToRoute('homepage');
         }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error
        ]);
    }

    /**
     * @Route("/deconnexion", name="security_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("/mot-de-passe-oublie", name="security_forgotten_password")
     */
    public function forgottenPassword(Request $request, UserRepository $userRepository, TokenGeneratorInterface $tokenGenerator, EntityManagerInterface $em, SendMailService $mailService): Response
    {
        $form = $this->createForm(ResetPasswordRequestType::class);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $user = $userRepository->findOneBy(['username' => $form->get('username')->getData()]);

            if($user) {
                $token = $tokenGenerator->generateToken();
                $user->setResetToken($token);
                $em->flush();

                $url = $this->generateUrl('security_reset_password', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

                $mailService->send(
                    'noreply@snowtricks.fr',
                    $user->getEmail(),
                    'Réinitialisation de votre mot de passe',
                    'reset_password.html.twig',
                    compact('url')
                );
            }

            $this->addFlash('success', "Si un compte existe avec ce nom d'utilisateur, vous recevrez sous peu un email pour réinitialiser votre mot de passe.");
            return $this->redirectToRoute('security_login');
        }

        return $this->render('security/reset_password_request.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/mot-de-passe-oublie/{token}", name="security_reset_password")
     */
    public function resetPassword(string $token, Request $request, UserRepository $userRepository, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = $userRepository->findOneBy(['resetToken' => $token]);

        if(!$user) {
            $this->addFlash('error', "Jeton invalide");

            return $this->redirectToRoute('security_login');
        }

        $form = $this->createForm(ResetPasswordType::class);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            if($user->getUserIdentifier() !== $form->get('username')->getData()) {
                $this->addFlash('error', "Le nom d'utilisateur ne correspond pas.");

                return $this->redirectToRoute('security_reset_password', [
                    'token' => $token
                ]);
            }

            $user->setResetToken('');
            $user->setPassword(
                $passwordHasher->hashPassword($user, $form->get('password')->getData())
            );
            $em->flush();

            $this->addFlash('success', "Votre mot de passe a bien été modifié.");

            return $this->redirectToRoute('security_login');
        }

        return $this->render('security/reset_password.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
