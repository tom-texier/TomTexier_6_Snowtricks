<?php

namespace App\Twig;

use App\Entity\Trick;
use App\Form\MediaType;
use Symfony\Component\Asset\Packages;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class MediaExtension extends AbstractExtension
{
    private Packages $packages;
    private Environment $twig;
    private ParameterBagInterface $parameterBag;

    public function __construct(Packages $packages, Environment $twig, ParameterBagInterface $parameterBag)
    {
        $this->packages = $packages;
        $this->twig = $twig;
        $this->parameterBag = $parameterBag;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('get_trick_thumbnail', [$this, 'getTrickThumbnail']),
            new TwigFunction('get_placeholder_url', [$this, 'getPlaceholder']),
        ];
    }

    public function getTrickThumbnail(Trick $trick): array
    {
        if(empty($trick->getMedias())) {
            return [
                'name' => "Placeholder",
                'url' => $this->getPlaceholder()
            ];
        }

        foreach ($trick->getMedias() as $media) {
            if($media->getType() === MediaType::TYPE_IMAGE) {
                return [
                    'name' => $media->getName(),
                    'url' => $this->packages->getUrl($this->getUploadsDirectory() . $media->getFilename())
                ];
            }
        }

        return [
            'name' => "Placeholder",
            'url' => $this->getPlaceholder()
        ];
    }

    public function getPlaceholder(): string
    {
        return $this->packages->getUrl('assets/img/placeholder.png');
    }

    private function getUploadsDirectory(): string
    {
        return $this->parameterBag->get('images_directory_public');
    }
}
