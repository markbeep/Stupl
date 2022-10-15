from enum import Enum
from sre_parse import CATEGORIES

class Categories(Enum):
    Other = 0
    BasicCourse = 1
    MinorCourse = 2
    CoreCourse = 3
    FirstYearExaminations = 4
    Seminar = 5
    Electives = 6
    BachelorThesis = 7
    GESS = 8


def category_to_enum(category: str) -> Categories:
    c = category.lower()
    if c == "basic courses":
        return Categories.BasicCourse
    if c == "minor courses":
        return Categories.MinorCourse
    if c == "core courses":
        return Categories.CoreCourse
    if c == "first year examinations":
        return Categories.FirstYearExaminations
    if c == "seminar":
        return Categories.Seminar
    if c == "electives":
        return Categories.Electives
    if c == "bachelor's thesis":
        return Categories.BachelorThesis
    if c == "gess":
        return Categories.GESS
    return Categories.Other
    
    
def enum_to_category_german(cat: Categories) -> str:
    return {
        Categories.Other: "Anderes",
        Categories.BasicCourse: "Grundlagenfächer",
        Categories.MinorCourse: "Ergänzungsfächer",
        Categories.CoreCourse: "Kernfächer",
        Categories.FirstYearExaminations: "Basisjahrfächer",
        Categories.Seminar: "Seminar",
        Categories.Electives: "Wahlfächer",
        Categories.BachelorThesis: "Bachelor Thesis",
        Categories.GESS: "GESS",
    }[cat]
