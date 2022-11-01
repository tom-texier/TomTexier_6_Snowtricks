<?php

namespace App\Controller;

use App\Repository\TrickRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(TrickRepository $trickRepository): Response
    {
        $tricks = $trickRepository->findByPage();

        return $this->render('home/index.html.twig', [
            'tricks' => $tricks,
            'found_items' => $tricks->count(),
            'next_page' => 1,
            'max_per_page' => TrickRepository::MAX_PER_PAGE
        ]);
    }
}
