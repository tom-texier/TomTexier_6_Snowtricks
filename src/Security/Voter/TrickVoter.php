<?php

namespace App\Security\Voter;

use App\Entity\Trick;
use App\Entity\User;
use App\Repository\TrickRepository;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class TrickVoter extends Voter
{
    public const EDIT = 'TRICK_EDIT';
    public const DELETE = 'TRICK_DELETE';

    private TrickRepository $trickRepository;

    public function __construct(TrickRepository $trickRepository)
    {
        $this->trickRepository = $trickRepository;
    }

    protected function supports(string $attribute, $subject): bool
    {
        if(in_array($attribute, [self::EDIT, self::DELETE])) {
            if(!$subject instanceof Trick) {
                $subject = $this->trickRepository->find(intval($subject));
            }

            if($subject instanceof Trick) {
                return true;
            }
        }

        return false;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::EDIT:
                return $this->canEdit($subject, $user);
            case self::DELETE:
                return $this->canDelete($subject, $user);
        }

        return false;
    }

    /**
     * @param int|string|Trick $trick Trick entity or Trick id
     * @param User $user
     * @return bool
     */
    private function canEdit($trick, User $user): bool
    {
        if(!$trick instanceof Trick) {
            $trick = $this->trickRepository->find(intval($trick));
        }

        if(!$trick instanceof Trick) {
            return false;
        }

        return $user === $trick->getAuthor();
    }

    /**
     * @param int|string|Trick $trick Trick entity or Trick id
     * @param User $user
     * @return bool
     */
    private function canDelete(Trick $trick, User $user): bool
    {
        if(!$trick instanceof Trick) {
            $trick = $this->trickRepository->find(intval($trick));
        }

        if(!$trick instanceof Trick) {
            return false;
        }

        return $user === $trick->getAuthor();
    }
}
