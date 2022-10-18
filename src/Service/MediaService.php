<?php

namespace App\Service;

use App\Entity\Media;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;

class MediaService
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function uploadMedia(File $file, string $folder, $name = null)
    {
        if(is_null($name)) {
            $name = pathinfo($file->getFilename(), PATHINFO_FILENAME);
        }

        $newFilename = $this->formatNameForUrl($name) . '-' . uniqid() . '.' . $file->guessExtension();

        try {
            $file->move($folder, $newFilename);
            $isUpload = true;
            $data = $newFilename;
        } catch (FileException $e) {
            $isUpload = false;
            $data = "Une erreur est survenue : " . $e;
        }

        return [
            "is_upload" => $isUpload,
            "data" => $data
        ];
    }

    public function setImage(Media $image, File $file, string $name, string $folder)
    {
        $upload = $this->uploadMedia($file, $folder, $name);

        if($upload['is_upload']) {
            $filename = $upload['data'];
            $image
                ->setName($name)
                ->setUrl($folder . "/" . $filename)
                ->setImage(true)
            ;

            $this->em->persist($image);
            $this->em->flush();

            return $image;
        }

        return null;
    }

    public function addImage(File $file, string $name, string $folder)
    {
        $image = new Media();

        return $this->setImage($image, $file, $name, $folder);
    }

    /**
     * Format filename
     * @param string $name
     * @return string
     */
    public function formatNameForUrl(string $name): string
    {
        return strtolower(str_replace(" ", "_", $name));
    }
}