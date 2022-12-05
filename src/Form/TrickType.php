<?php

namespace App\Form;

use App\Entity\Group;
use App\Entity\Trick;
use App\Form\Tools\CustomCollectionType;
use App\Repository\TrickRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class TrickType extends AbstractType
{
    private TrickRepository $trickRepository;
    private SluggerInterface $slugger;

    public function __construct(TrickRepository $trickRepository, SluggerInterface $slugger)
    {
        $this->trickRepository = $trickRepository;
        $this->slugger = $slugger;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => "Nom"
            ])
            ->add('trickGroup', EntityType::class, [
                'label' => 'Groupe',
                'class' => Group::class,
                'choice_label' => 'name'
            ])
            ->add('description', TextareaType::class, [
                'label' => "Description"
            ])
            ->add('medias', CustomCollectionType::class, [
                'label' => "Médias",
                'entry_type' => MediaType::class,
                'add_message' => "<i class='fas fa-plus'></i> Ajouter un média",
                'min_items' => 1,
                'mapped' => false
            ])
        ;
    }

    public function trickExist($trick, ExecutionContextInterface $context)
    {
        if(!$trick instanceof Trick) return;

        /** @var Trick $trickFound */
        $trickFound = $this->trickRepository->findOneBy([
            'slug' => strtolower($this->slugger->slug($trick->getName()))
        ]);

        if($trickFound && (!$trick->getId() || $trick->getId() != $trickFound->getId())) {
            $context
                ->buildViolation("Une figure porte déjà ce nom")
                ->atPath("name")
                ->addViolation()
            ;
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Trick::class,
            'constraints' => [
                new Callback([$this, 'trickExist'])
            ]
        ]);
    }
}
