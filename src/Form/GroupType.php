<?php

namespace App\Form;

use App\Entity\Group;
use App\Repository\GroupRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class GroupType extends AbstractType
{
    private GroupRepository $groupRepository;
    private SluggerInterface $slugger;

    public function __construct(GroupRepository $groupRepository, SluggerInterface $slugger)
    {
        $this->groupRepository = $groupRepository;
        $this->slugger = $slugger;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => "Nom du groupe",
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Group::class,
            'constraints' => [
                new Callback([$this, 'groupExist'])
            ]
        ]);
    }

    public function groupExist($group, ExecutionContextInterface $context): void
    {
        if(!$group instanceof Group) return;

        if(!$group->getName()) {
            $context
                ->buildViolation("Vous devez compléter ce champ.")
                ->atPath("name")
                ->addViolation()
            ;
        }
        else {
            /** @var Group $groupFound */
            $groupFound = $this->groupRepository->findOneBy([
                'slug' => strtolower($this->slugger->slug($group->getName()))
            ]);

            if($groupFound && (!$group->getId() || $group->getId() != $groupFound->getId())) {
                $context
                    ->buildViolation("Un groupe porte déjà ce nom")
                    ->atPath("name")
                    ->addViolation()
                ;
            }
        }
    }
}
