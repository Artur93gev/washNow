

#!/bin/bash

# building angular project in outsource directory
# then moving it to real(production) path

# the script is getting environment as argument
# by default it will use production mode

# checking for argument passed


if [ "$1" == "staging" ]; then
    buildDir="staging_bme"
    env="staging"
elif [ "$1" == "prod" ]; then
    buildDir="springbme"
    env="prod"
elif [ -z "$1" ]; then
    echo "Wrong environment argument"
    exit
fi

projectDir="/var/www/html/$buildDir"

cd $projectDir/resources/frontend-new

if [ ! -d "$projectDir/resources/frontend-new/src/i18n" ]; then
        mkdir "$projectDir/resources/frontend-new/src/i18n"
        echo "i18n folder created"
else
        echo "i18n folder already exists"
fi

cp -a $projectDir/resources/lang/.  $projectDir/resources/frontend-new/src/i18n/ &&
        ng build --prod --aot --env=$env &&
        rsync -a $projectDir/dist $projectDir/public &&
        rm -rf $projectDir/dist/*
        echo "build successfully finished"
