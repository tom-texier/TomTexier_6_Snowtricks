<?php

namespace App\Controller;

use App\Entity\Group;
use App\Form\GroupType;
use App\Repository\GroupRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class GroupController extends AbstractController
{
    /**
     * @Route("/ajax/groups/new", name="ajax_groups_getForm", methods={"POST"})
     */
    public function getForm(Request $request): Response
    {
        $this->denyAccessUnlessGranted("ROLE_USER");

        if (!$request->isXmlHttpRequest()) {
            return new JsonResponse(['message' => 'Accessible uniquement en Ajax !'], 400);
        }

        $form = $this->createForm(GroupType::class, null, [
            'action' => $this->generateUrl('ajax_groups_add')
        ]);

        $datas['view'] = $this->renderView('ajax/group.form.html.twig', [
            'form' => $form->createView()
        ]);

        return new JsonResponse($datas);
    }

    /**
     * @Route("/ajax/groups/add", name="ajax_groups_add", methods={"POST"})
     */
    public function add(Request $request, SluggerInterface $slugger, GroupRepository $groupRepository): Response
    {
        $this->denyAccessUnlessGranted("ROLE_USER");

        if (!$request->isXmlHttpRequest()) {
            return new JsonResponse(['message' => 'Accessible uniquement en Ajax !'], 400);
        }

        $form = $this->createForm(GroupType::class);

        $form->handleRequest($request);

        if($form->isValid()) {
            /** @var Group $group */
            $group = $form->getData();
            $group->setSlug(strtolower($slugger->slug($group->getName())));

            $groupRepository->add($group, true);

            $datas['success'] = true;
            $datas['data']['group'] = $group->jsonSerialize();

            return new JsonResponse($datas, 201);
        }

        $datas['view'] = $this->renderView('ajax/group.form.html.twig', [
            'form' => $form->createView()
        ]);

        return new JsonResponse($datas, 405);
    }
}
