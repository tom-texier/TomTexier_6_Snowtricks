<?php

namespace App\Form;

use App\Entity\Group;
use App\Entity\Trick;
use App\Form\Tools\CustomCollectionType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TrickType extends AbstractType
{
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
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Trick::class,
        ]);
    }
}
