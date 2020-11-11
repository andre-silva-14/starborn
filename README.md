# Star Born
An Innovative authentication page built with Django.

(In development...)


## Getting started...

#### Set up the Environment

After cloning the repository, install the requirements and set up a `SECRET_KEY`:

    $ pip install -r requirements.txt
    $ export SECRET_KEY=**************************

#### Compiling the code

To compile the necessary code, cd into the directory containing `manage.py`

    $ cd starborn

and compile the Typescript and Sass before running the server:

    $ tsc --outDir ./static/scripts/dist static/scripts/stars.ts
    $ sass ./static/styles/styles.scss ./static/styles/dist/styles.css
    $ py manage.py runserver