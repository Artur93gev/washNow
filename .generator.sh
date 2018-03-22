#!/bin/bash

# system based command namings by variables



# use this function for notifing client about 
# errors that accured which must also stop script running

function notify
{
	if [ -z "$1" ]; then
		echo "no such command"
	else
		echo $1
	fi

	exit 0
}

# moving to script containing directory

function toScriptLocation
{
	scriptDir=`dirname $0`
	cd $scriptDir
}

function recognizeSystem
{
	unameOut="$(uname -s)"
	case "${unameOut}" in
	    Linux*)     machine=Linux;;
	    Darwin*)    machine=Mac;;
	    CYGWIN*)    machine=Cygwin;;
	    MINGW*)     machine=MinGw;;
	    *)          machine="UNKNOWN:${unameOut}"
	esac

	setupVariables $machine
}

function setupVariables
{
	if [ "$1" = "Linux" ]; then
		currentDir=PWD
	fi
}

function createModule
{
	toScriptLocation

	# initialize creating directory path
	dirPath="$PWD/src/app/modules"
	folderName=$1

	newModule="$dirPath/$folderName"

	if [ -d "$newModule" ]; then
		notify "directory with such name exists"
	else
		# making 'module' directory
	
		mkdir $newModule
		touch ${newModule}/app.ts
		
		# making 'controller' directory with default 'app.ts' file
	
		controllerDir="$newModule/controller"
		mkdir $controllerDir
		touch ${controllerDir}/index.ts
		
		# making 'view' directry with default 'index.html' file
	
		viewDir="$newModule/view"
		mkdir $viewDir
		touch ${viewDir}/index.html
		
		# making 'route' directory with default 'config.ts' file
	
		routeDir="$newModule/route"
		mkdir $routeDir
		touch ${routeDir}/config.ts
	
		# making 'services' directory with default 'index.ts' file
	
		servicesDir="$newModule/services"
		mkdir $servicesDir
		touch ${servicesDir}/index.ts
	
		# making 'components' directory with
	
		componentsDir="$newModule/components"
		mkdir $componentsDir
	
		# send a message that work is done
		echo "$1 module has been created"
	fi
}

function removeModule
{
	toScriptLocation

	# initialize creating directory path
	dirPath="$PWD/src/app/modules"
	folderName=$1

	module="$dirPath/$folderName"

	if [ -d "$module" ]; then
		rm -rf $module

		# send a message that work is done
		
		notify "$1 module has been deleted"
	else
		notify "there is no such module initialized"
	fi
}

function createComponent
{

	# initialize creating directory path

	newComponent="$PWD/$1"
	if [ -d "$newComponent" ]; then
		notify "there is already declared component with $1 name"
	else

		# making component directory with default index.ts file

		mkdir $newComponent
		touch ${newComponent}/index.ts

		# making 'view' directry with default 'index.html' file
	
		viewDir="$newComponent/view"
		mkdir $viewDir
		touch ${viewDir}/index.html
		
		# making 'services' directory with default 'index.ts' file
	
		servicesDir="$newComponent/services"
		mkdir $servicesDir
		touch ${servicesDir}/index.ts

		# send a message that work is done

		notify "$1 component has been created"
	fi
}

function  removeComponent
{
	component="$PWD/$1"

	if [ -d $component ]; then
		rm -rf $component

		# send a message that work is done

		notify "$1 component has been deleted"
	else
		notify "there no such component in current directory"
	fi
}

function run
{
	echo $1 $2 $3
	if [ "$1" = "module" ]; then
		createModule $2
	elif [ "$1" = "component" ]; then
		createComponent $2
	elif [ "$1" = "remove" ]; then
		if [ "$2" = "module" ]; then
			removeModule $3
		elif [ "$2" = "component" ]; then
			removeComponent $3
		else
			notify
		fi
	else
		notify
	fi
}

# running the main function
run $1 $2 $3
