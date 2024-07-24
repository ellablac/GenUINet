const json = {
    "title": "Example custom tooltip and dynamic defaults",
    "pages": [
     {
      "name": "page1",
      "elements": [
    {
        "type": "dropdown",
        "name": "country",
        "title": "Select a country||EXAMPLE 1 : Automatically default to the first country from URL",
        "showNoneItem": false,
        "choicesByUrl": {
          "url": "https://surveyjs.io/api/CountriesExample",
          "valueName": "name"
        },
        "choicesLazyLoadEnabled": false,

    },
    {
        type: "text",
        name: "dynamicTextUrl",
        title: "Dynamic Default from Country||EXAMPLE 2 : Set DEFAULT to the value of another element",
    },
    {
        type: "text",
        name: "dynamicValueUrl",
        title: "Dynamic Value from Country||EXAMPLE 2 : Set a VALUE to the value of another element",
    },

    {
        type: "text",
        name: "dynamicText",
        title: "Dynamic Randomized Name||EXAMPLE 3 : Dynamically set a value or default to a variable that can be created in run time"
    },

    {
        "type": "checkbox",
        "name": "os",
        "title": "What operating system(s) do you use on your work computer(s)?||EXAMPLE 4 : Tooltip",
        "choices": [
         "Windows",
         "Linux",
         "Macintosh OSX"
        ],
        "showOtherItem": true,
        "otherText": "Other (specify)"
       },


       {
        "type": "checkbox",
        "name": "languages",
        "title": "What programming language(s) do you use at work?||EXAMPLE 4 : Tooltip",
        "choices": [
         "JavaScript",
         "Java",
         "Python",
         "CSS",
         "PHP",
         "Ruby",
         "C++",
         "C",
         "Shell",
         "C#",
         "Objective-C",
         "R",
         "VimL",
         "Go",
         "Perl",
         "CoffeeScript",
         "TeX",
         "Swift",
         "Scala",
         "Emacs Lisp",
         "Haskell",
         "Lua",
         "Clojure",
         "MATLAB",
         "Arduino",
         "Makefile",
         "Groovy",
         "Puppet",
         "Rust",
         "PowerShell"
        ],
        "showOtherItem": true,
        "otherText": "Other (specify)",
        "colCount": 4,
        "maxSelectedChoices": 3
       }
      ]
     }
    ],
    "showQuestionNumbers": "off",

   }