from django.apps import AppConfig


class FillDatabase(AppConfig):
    name = "app"
    verbose_name = "Fill Database"

    def ready(self):
        import django
        from app.categories import category_to_enum
        import json
        from .models import VVZSubjects
        with open("data/lectures.json", 'r') as f:
            data = json.load(f)

        for i, x in enumerate(data):
            try:
                lec, created = VVZSubjects.objects.get_or_create(
                    vvz_id=x["vvz_id"],
                    defaults={
                        "name": x["name"],
                        "credits": x["credits"],
                        "semester": x["semester"],
                        "year": x["year"],
                        "category": category_to_enum(x["category"]).value,
                    }
                )
                if created:
                    print(f"Added subject {i}")
                    lec.save()
            except django.db.utils.IntegrityError as e:
                print(f"Error filling db: {e} | {x = }")
