
/*
    =========================================
    📦📦📦 package.json and NPM 📦📦📦
    =========================================

    NodeJS comes with Node Package Manager (npm). It is a command-line
    utility for interacting with the working repository that helps us in
    package installation, version management, and dependency management.

    To put simplier, you may be working on a package of module codes. NPM
    helps you to control the versions, handle and manage the external codes
    that you choose to install, and if it updates, it also help you do so.

    ------------------------------------------------------------

    1. package.json

    Say you are working on a project, and you would like this to be packaged.
    It is very simple to do so with npm, simply type in terminal:

            npm init

    Go through the configurations, putting the git repository if wanted.
    Then, a package.json will pop up, which contains metadatas for your package
    
    ------------------------------------------------------------

    2. NPM - Downloading others code for good

    Say you came across some nice library code written by others and want to use
    in your own project. Simply:

        npm install <pkg name>

    and two things pop up:
        >   node_modules folder that contains the source code of that open-source
            Node.js package you wanted, and
        >   'dependencies' in the package.json, listing all the external packages
            that you downloaded and use

    In your project now, the external packages can easily be used by importing it:

        import .. from <pkg name>
        or
        require(pkg name)

    Say you suddenly don't need that package anymore. Simply:

        npm uninstall <pkg name>

    -----------------------------------------------------------------------

    NPM helps you with versioning. The standard used by most people is:

        XX.XX.XX
    Major.Minor.Patch

    Major - Breaking changes. Some deprecated code are removed. Previous version
            code may fail
    Minor - Non-breaking changes. Features may be added. Some code marked as deprecated
    Patch - Mainly bug fixes

    In the package.json, you may found out the version number is prefixed with characters:

    >   ^   -   Update automatically minor or patch updates
    >   ~   -   Update automatically patch updates only
    >   None-   Fixed version. Not even patch update
    >   *   -   Any latest version will be installed. Not recommended.
*/


//  Lodash is a utilities package that aids in a lot of data manipulation
//  Like numbers, arrays, objects, and compositing functions
//  It is common practice that lodash is used through variable underscore _
const _ = require('lodash');


function dependentExample() {
    const arr = [1,2,3,4,5];
    _.fill(arr, 'filled', 1,4);
    console.log(arr);
}

dependentExample();