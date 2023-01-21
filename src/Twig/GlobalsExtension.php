<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigTest;

class GlobalsExtension extends AbstractExtension
{

    public function getTests()
    {
        return [
            new TwigTest('instanceOf', [$this, 'isInstanceOf']),
        ];
    }

    public function isInstanceOf($var, $instance): bool
    {
        return $var instanceof $instance;
    }
}
