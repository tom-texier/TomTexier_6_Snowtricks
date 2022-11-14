<?php

namespace App\Twig;

use App\Entity\Trick;
use App\Form\MediaType;
use Symfony\Component\Asset\Packages;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class MediaExtension extends AbstractExtension
{
    private Packages $packages;
    private Environment $twig;

    public function __construct(Packages $packages, Environment $twig)
    {
        $this->packages = $packages;
        $this->twig = $twig;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('get_trick_thumbnail', [$this, 'getTrickThumbnail']),
            new TwigFunction('get_placeholder', [$this, 'getPlaceholder']),
        ];
    }

    public function getTrickThumbnail(Trick $trick)
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

    private function getUploadsDirectory()
    {
        return $this->twig->getGlobals()['images_directory'];
    }
}