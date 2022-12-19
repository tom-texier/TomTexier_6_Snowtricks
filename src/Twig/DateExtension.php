<?php

namespace App\Twig;

use DateTimeImmutable;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class DateExtension extends AbstractExtension
{
    const TRADUCTIONS = [
        'january' => 'janvier',
        'february' => 'février',
        'march' => 'mars',
        'april' => 'avril',
        'may' => 'mai',
        'june' => 'juin',
        'july' => 'juillet',
        'august' => 'août',
        'september' => 'septembre',
        'october' => 'octobre',
        'november' => 'novembre',
        'december' => 'décembre',
    ];

    public function getFilters()
    {
        return [
            new TwigFilter('french_date', [$this, 'getFrenchDate'])
        ];
    }

    public function getFrenchDate(DateTimeImmutable $date, string $format)
    {
        $date = strtolower($date->format($format));

        foreach (self::TRADUCTIONS as $key => $trad) {
            if(strpos($date, $key) !== false) {
                $date = str_replace($key, $trad, $date);
            }
        }

        return $date;
    }
}