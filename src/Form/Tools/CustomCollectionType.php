<?php
namespace App\Form\Tools;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CustomCollectionType extends AbstractType
{

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'required' => true,
            'allow_add' => true,
            'allow_delete' => true,
            'add_message' => 'Ajouter',
            'by_reference' => false,
            'delete_empty' => true,
            'min_items' => 0,
            'max_items' => null
        ]);
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        parent::buildView($view, $form, $options);

        $view->vars = array_merge_recursive($view->vars, [
            'attr' => ['class' => 'custom_collection_type_container']
        ]);
        $view->vars = array_merge_recursive($view->vars, [
            'add_message' => $options['add_message']
        ]);
        $view->vars = array_merge_recursive($view->vars, [
            'prototype_name' => $options['prototype_name']
        ]);
        $view->vars = array_merge_recursive($view->vars, [
            'min_items' => $options['min_items']
        ]);
        $view->vars = array_merge_recursive($view->vars, [
            'max_items' => $options['max_items']
        ]);

    }

    /**
     * @return void
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
    }

    public function getParent()
    {
        return CollectionType::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getName(): string
    {
        return 'custom_collection_form';
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix(): string 
    {
        return 'custom_collection_form';
    }
}
