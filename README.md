<p align="center">
    <img alt="StarBorn - An Educational platform to explore our solar system." title="StarBorn - An Educational platform to explore our solar system." src=".github/logo.png" />
</p>

<p align="center">An Educational platform to explore our solar system.</p>


## Getting started...

#### Set up the Environment

After cloning the repository, install the requirements and set up a `SECRET_KEY`:

    $ pip install -r requirements.txt
    $ export SECRET_KEY=**************************

#### Compiling the code

To compile the necessary code, cd into the directory containing `manage.py`

    $ cd starborn

and compile the Typescript and Sass before running the server:

    $ tsc -t es6 --outDir ./static/scripts/dist static/scripts/stars.ts
    $ sass ./static/styles/styles.scss ./static/styles/dist/styles.css
    $ py manage.py runserver