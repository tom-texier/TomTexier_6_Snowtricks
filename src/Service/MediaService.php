<?php

namespace App\Service;

use App\Entity\Media;
use App\Form\MediaType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class MediaService
{
    private EntityManagerInterface $em;
    private SluggerInterface $slugger;
    private ParameterBagInterface $params;

    const CREATE_IMAGE_ERROR = "Impossible d'uploader l'image sur le serveur.";

    public function __construct(EntityManagerInterface $em, SluggerInterface $slugger, ParameterBagInterface $params)
    {
        $this->em = $em;
        $this->slugger = $slugger;
        $this->params = $params;
    }

    public function uploadMedia(File $file, string $folder, $name = null): array
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
            $data = self::CREATE_IMAGE_ERROR;
        }

        return [
            "is_upload" => $isUpload,
            "data" => $data
        ];
    }

    /**
     * @param Media $image
     * @param File $file
     * @param string $name
     * @param string $folder
     * @return Media|string|null
     */
    public function setImage(Media $image, File $file, string $name, string $folder)
    {
        $upload = $this->uploadMedia($file, $folder, $name);

        if($upload['is_upload']) {
            $filename = $upload['data'];
            $image
                ->setName($name)
                ->setFilename($filename)
                ->setType(MediaType::TYPE_IMAGE)
            ;

            return $image;
        }

        if(!empty($upload['data'])) {
            return $upload['data'];
        }

        return null;
    }

    /**
     * @param File $file
     * @param string $name
     * @param string $folder
     * @return Media|null
     */
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
        return $this->slugger->slug($name);
    }

    public function addVideo(string $name, string $source): Media
    {
        $video = new Media();

        return $this->setVideo($video, $name, $source);
    }

    public function setVideo(Media $video, string $name, string $source): Media
    {
        $video
            ->setType(MediaType::TYPE_VIDEO)
            ->setName($name)
            ->setSource($source)
        ;

        return $video;
    }

    public function getFile(Media $media): UploadedFile
    {
        $mime_type = mime_content_type($this->params->get('images_directory') . $media->getFilename());

        return new UploadedFile($this->params->get('images_directory') . $media->getFilename(), $media->getFilename(), $mime_type);
    }

    public function removeFile(Media $media): bool
    {
        if(file_exists($this->params->get('images_directory') . $media->getFilename())) {
            return unlink($this->params->get('images_directory') . $media->getFilename());
        }

        return true;
    }
}
