<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\CommentRepository;
use App\Repository\TrickRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class CommentController extends AbstractController
{
    private CommentRepository $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    /**
     * @Route("/trick/{id}/comment/add", name="trick_comment_add")
     * @isGranted("ROLE_USER")
     */
    public function add(Request $request, TrickRepository $trickRepository, EntityManagerInterface $em, $id)
    {
        $trick = $trickRepository->find($id);

        if(!$trick) {
            throw $this->createNotFoundException("Cette figure n'existe pas !");
        }

        $form = $this->createForm(CommentType::class);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            /** @var Comment $comment */
            $comment = $form->getData();
            $comment->setAuthor($this->getUser());

            $trick->addComment($comment);

            $em->persist($comment);
            $em->flush();

            $this->addFlash('success', "Votre commentaire a bien été ajouté.");

            return $this->redirectToRoute('trick_show', [
                'slug' => $trick->getSlug()
            ]);
        }

        $this->addFlash('error', "Votre commentaire ne peut être vide.");

        return $this->redirectToRoute('trick_show', [
            'slug' => $trick->getSlug()
        ]);
    }

    /**
     * @Route("/ajax/comments", name="ajax_comment_getComments", methods={"GET"}, options={"expose"=true})
     */
    public function getComments(Request $request, CommentRepository $commentRepository)
    {
        if (!$request->isXmlHttpRequest()) {
            return new JsonResponse(['message' => 'Accessible uniquement en Ajax !'], 400);
        }

        if(!$request->get('page') || !$request->get('trick_id')) {
            return new JsonResponse(['message' => 'Une erreur est survenue !'], 500);
        }

        $page = intval($request->get('page'));
        $trick_id = intval($request->get('trick_id'));

        $comments = $commentRepository->findByPage($trick_id, $page);

        $datas['view'] = $this->renderView('trick/ajax/comments.html.twig', [
            'comments' => $comments,
        ]);

        $datas['found_items'] = $comments->count();
        $datas['next_page'] = $page + 1;
        $datas['max_per_page'] = CommentRepository::MAX_PER_PAGE;

        return new JsonResponse($datas);
    }

    /**
     * @Route("/trick/comment/delete/{comment_id}", name="trick_comment_delete")
     */
    public function delete($comment_id)
    {
        $comment = $this->commentRepository->find($comment_id);

        $this->denyAccessUnlessGranted("COMMENT_DELETE", $comment);

        if(!$comment) {
            throw $this->createNotFoundException("Ce commentaire n'existe pas !");
        }

        $this->commentRepository->remove($comment, true);

        $this->addFlash('success', "Votre commentaire a bien été supprimé.");

        return $this->redirectToRoute('trick_show', [
            'slug' => $comment->getTrick()->getSlug()
        ]);
    }
}