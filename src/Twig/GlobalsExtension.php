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

    /**
     * @param mixed $var
     * @param mixed $instance
     */
    public function isInstanceOf($var, $instance): bool
    {
        return $var instanceof $instance;
    }
}
