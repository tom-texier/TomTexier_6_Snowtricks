<?php

namespace App\DataFixtures;

use App\Entity\Comment;
use App\Entity\Group;
use App\Entity\Media;
use App\Entity\Trick;
use App\Entity\User;
use App\Form\MediaType;
use App\Service\MediaService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\DBAL\Exception;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class AppFixtures extends Fixture
{
    const TRICK_GROUPS = [0 => 'Grabs', 1 => 'Rotations', 2 => 'Flips'];
    const AVATAR_IMG = ['avatar-1.png', 'avatar-2.png', 'avatar-3.png', 'avatar-4.png', 'avatar-5.png'];

    const TRICKS = [
        [
            'name' => "Mute",
            'description' => "Saisie de la carre frontside de la planche entre les deux pieds avec la main avant",
            'group' => 0,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '1.png'
                ],
                [
                    'is_image' => false,
                    'source' => '<iframe width="560" height="315" src="https://www.youtube.com/embed/8KotvBY28Mo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                ]
            ]
        ],
        [
            'name' => "Indy",
            'description' => "Saisie de la carre frontside de la planche, entre les deux pieds, avec la main arrière",
            'group' => 0,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '2.png'
                ],
                [
                    'is_image' => false,
                    'source' => '<iframe width="560" height="315" src="https://www.youtube.com/embed/8KotvBY28Mo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                ]
            ]
        ],
        [
            'name' => "Stalefish",
            'description' => "Saisie de la carre backside de la planche entre les deux pieds avec la main arrière",
            'group' => 0,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '3.png'
                ],
                [
                    'is_image' => true,
                    'filename' => '4.png'
                ]
            ]
        ],
        [
            'name' => "Tail grab",
            'description' => "Saisie de la partie arrière de la planche, avec la main arrière",
            'group' => 0,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '5.png'
                ],
                [
                    'is_image' => true,
                    'filename' => '6.png'
                ]
            ]
        ],
        [
            'name' => "Nose grab",
            'description' => "Saisie de la partie avant de la planche, avec la main avant",
            'group' => 0,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '1.png'
                ],
                [
                    'is_image' => false,
                    'source' => '<iframe width="560" height="315" src="https://www.youtube.com/embed/8KotvBY28Mo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                ]
            ]
        ],
        [
            'name' => "180°",
            'description' => "Désigne un demi-tour, soit 180 degrés d'angle",
            'group' => 1,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '2.png'
                ]
            ]
        ],
        [
            'name' => "360°",
            'description' => "Trois six pour un tour complet",
            'group' => 1,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '3.png'
                ]
            ]
        ],
        [
            'name' => "540°",
            'description' => "Cinq quatre pour un tour et demi",
            'group' => 1,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '4.png'
                ]
            ]
        ],
        [
            'name' => "720°",
            'description' => "Sept deux pour deux tours complets",
            'group' => 1,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '5.png'
                ]
            ]
        ],
        [
            'name' => "Front flip",
            'description' => "Désigne une rotation en avant",
            'group' => 2,
            'medias' => [
                [
                    'is_image' => true,
                    'filename' => '6.png'
                ]
            ]
        ],
        [
            'name' => "Back flip",
            'description' => "Désigne une rotation en arrière",
            'group' => 2,
            'medias' => [
                [
                    'is_image' => false,
                    'source' => '<iframe width="560" height="315" src="https://www.youtube.com/embed/8KotvBY28Mo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                ],
                [
                    'is_image' => true,
                    'filename' => '1.png'
                ]
            ]
        ],
    ];

    private UserPasswordHasherInterface $hasher;
    private MediaService $mediaService;
    private ParameterBagInterface $params;
    private SluggerInterface $slugger;
    private EntityManagerInterface $em;

    /**
     * @throws Exception
     */
    public function __construct(UserPasswordHasherInterface $hasher, MediaService $mediaService, ParameterBagInterface $params, SluggerInterface $slugger, EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->deactivateForeignKeyChecks();

        $this->hasher = $hasher;
        $this->mediaService = $mediaService;
        $this->params = $params;
        $this->slugger = $slugger;
    }

    public function load(ObjectManager $manager): void
    {
        $this->activateForeignKeyChecks();
        $faker = Factory::create('fr_FR');

        if(!is_dir($this->params->get('images_directory'))) {
            mkdir($this->params->get('images_directory'), 0777, true);
        }

        ############################## USER ADMIN ##############################
        $admin = new User();
        $hash = $this->hasher->hashPassword($admin, "1adminadmin");

        $admin
            ->setEmail("admin@gmail.com")
            ->setPassword($hash)
            ->setFirstname("Admin")
            ->setLastname("Snowtricks")
            ->setUsername("admin")
            ->setVerified(1)
            ->setRoles(['ROLE_ADMIN']);

        $manager->persist($admin);

        ##################################################################

        ############################## USERS ##############################
        $users = [];
        for ($u = 0; $u < 5; $u++) {
            $user = new User();
            $hash = $this->hasher->hashPassword($user, "password");
            $user
                ->setEmail($faker->email())
                ->setPassword($hash)
                ->setFirstname($faker->firstName())
                ->setLastname($faker->lastName())
                ->setUsername($faker->userName())
                ->setVerified(1);

            $filename = $faker->randomElement(self::AVATAR_IMG);
            $mime_type = mime_content_type('assets/fixtures_img/' . $filename);
            $file = new UploadedFile('assets/fixtures_img/' . $filename, $filename, $mime_type);
            $newFilename = uniqid() . '.' . $file->guessExtension();
            copy($file->getPathname(), $this->params->get('images_directory') . $newFilename);

            $newMedia = new Media();
            $newMedia
                ->setName($newFilename)
                ->setFilename($newFilename)
                ->setType(MediaType::TYPE_IMAGE)
            ;

            $user->setAvatarImage($newMedia);

            $users[] = $user;

            $manager->persist($user);
        }
        ##################################################################

        ############################## GROUPS ##############################
        $groups = [];
        foreach(self::TRICK_GROUPS as $key => $group_name) {
            $group = new Group();
            $group
                ->setName($group_name)
                ->setSlug(strtolower($this->slugger->slug($group_name)))
            ;

            $groups[$key] = $group;

            $manager->persist($group);
        }
        ##################################################################

        ############################## TRICKS ##############################
        $tricks = [];
        foreach(self::TRICKS as $element) {
            $trick = new Trick();
            $trick
                ->setName($element['name'])
                ->setSlug(strtolower($this->slugger->slug($element['name'])))
                ->setDescription($element['description'])
                ->setAuthor($faker->randomElement($users))
                ->setTrickGroup($groups[$element['group']])
                ->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeThisDecade()))
            ;

            foreach ($element['medias'] as $media) {
                if($media['is_image']) {
                    $mime_type = mime_content_type('assets/fixtures_img/' . $media['filename']);
                    $file = new UploadedFile('assets/fixtures_img/' . $media['filename'], $media['filename'], $mime_type);
                    $newFilename = uniqid() . '.' . $file->guessExtension();
                    copy($file->getPathname(), $this->params->get('images_directory') . $newFilename);

                    $newMedia = new Media();
                    $newMedia
                        ->setName($newFilename)
                        ->setFilename($newFilename)
                        ->setType(MediaType::TYPE_IMAGE)
                    ;
                }
                else {
                    $newMedia = $this->mediaService->addVideo('Vidéo', $media['source']);
                }

                if($newMedia instanceof Media) {
                    $trick->addMedia($newMedia);
                }
            }

            $tricks[] = $trick;
            $manager->persist($trick);
        }
        foreach(self::TRICKS as $element) {
            $trick = new Trick();
            $trick
                ->setName($element['name'] . ' 2')
                ->setSlug(strtolower($this->slugger->slug($element['name'] . ' 2')))
                ->setDescription($element['description'])
                ->setAuthor($faker->randomElement($users))
                ->setTrickGroup($groups[$element['group']])
                ->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeThisDecade()))
            ;

            foreach ($element['medias'] as $media) {
                if($media['is_image']) {
                    $mime_type = mime_content_type('assets/fixtures_img/' . $media['filename']);
                    $file = new UploadedFile('assets/fixtures_img/' . $media['filename'], $media['filename'], $mime_type);
                    $newFilename = uniqid() . '.' . $file->guessExtension();
                    copy($file->getPathname(), $this->params->get('images_directory') . $newFilename);

                    $newMedia = new Media();
                    $newMedia
                        ->setName($newFilename)
                        ->setFilename($newFilename)
                        ->setType(MediaType::TYPE_IMAGE)
                    ;
                }
                else {
                    $newMedia = $this->mediaService->addVideo('Vidéo', $media['source']);
                }

                if($newMedia instanceof Media) {
                    $trick->addMedia($newMedia);
                }
            }

            $tricks[] = $trick;
            $manager->persist($trick);
        }
        ##################################################################

        ############################## COMMENTS ##############################
        for($i = 0; $i < 500; $i++) {
            $comment = new Comment();
            /** @var Trick $trick */
            $trick = $faker->randomElement($tricks);
            $comment
                ->setText($faker->realText())
                ->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween($trick->getCreatedAt()->format('j F Y'))))
                ->setTrick($trick)
                ->setAuthor($faker->randomElement($users))
            ;
            $manager->persist($comment);
        }
        ##################################################################

        $manager->flush();
    }

    /**
     * @throws Exception
     */
    private function activateForeignKeyChecks(): void
    {
        $this->em->getConnection()->executeQuery("SET FOREIGN_KEY_CHECKS=1");
    }

    /**
     * @throws Exception
     */
    private function deactivateForeignKeyChecks(): void
    {
        $this->em->getConnection()->executeQuery("SET FOREIGN_KEY_CHECKS=0");
    }
}
