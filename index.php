<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <?php

        $dir = new DirectoryIterator(dirname(__FILE__));
        foreach ($dir as $file) {
            if (!$file->isDot()) {
                echo '<a href="' . $file->getFilename() . '">' . $file->getFilename() . '</a><br />';

                $dir2 = new DirectoryIterator($file->getFilename());
                if( $dir2 ) {
                    foreach ($dir2 as $file2) {
                        echo '- <a href="' . $file2->getFilename() . '">' . $file2->getFilename() . '</a><br />';
                    }
                }
            }
        }
    ?>
</body>
</html>

