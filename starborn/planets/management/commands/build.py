from typing import Any, Optional
from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    help = 'Build app dependencies'

    def handle(self, *args: Any, **options: Any) -> Optional[str]:
        
        compile_tsc = 'tsc -t es6 --outDir ./static/scripts/dist static/scripts/stars.ts'
        compile_sass = 'sass ./static/styles/styles.scss ./static/styles/dist/styles.css'

        build_tsc = os.system(compile_tsc)
        build_sass = os.system(compile_sass)

        if build_sass == 0 and build_tsc == 0:
            self.stdout.write("Build Successful.")
        else:
            self.stdout.write("Build Failed.")