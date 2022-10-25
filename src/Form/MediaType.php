<?php

namespace App\Form;

use App\Entity\Media;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Form;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class MediaType extends AbstractType
{
    const TYPE_IMAGE = 1;
    const TYPE_VIDEO = 2;

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => "Nom du média",
                'required' => true,
            ])
            ->add('type', ChoiceType::class, [
                'label' => "Type de média",
                'choices' => [
                    'Image' => self::TYPE_IMAGE,
                    'Vidéo' => self::TYPE_VIDEO
                ],
                'expanded' => true,
                'data' => self::TYPE_IMAGE
            ])
            ->add('source', TextareaType::class, [
                'label' => "Source",
                'required' => false,
                'attr' => [
                    'placeholder' => "Collez ici la balise embed générée par la plateforme de streaming",
                ]
            ])
            ->add('image', FileType::class, [
                'label' => "",
                'required' => false,
                'mapped' => false
            ])
        ;
    }

    public function validate($media, ExecutionContextInterface $context): void
    {
        dump($media);
        if($media) {
            if($media->getType() === MediaType::TYPE_IMAGE && !$context->getObject()['image']->getData()) {
                $context
                    ->buildViolation("Vous devez choisir un fichier")
                    ->atPath('image')
                    ->addViolation()
                ;
            }
            elseif ($media->getType() === MediaType::TYPE_VIDEO && !$media->getSource()) {
                $context
                    ->buildViolation("La source ne peut être vide")
                    ->atPath('source')
                    ->addViolation()
                ;
            }
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Media::class,
            'constraints' => [
                new Callback([$this, 'validate'])
            ]
        ]);
    }
}
