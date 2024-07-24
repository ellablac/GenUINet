

/**
 * SurveyJS Event Handlers
 *
 * This script modifies the SurveyJS instance by attaching event handlers 
 * to various SurveyJS events.
 * The following events are handled:
 *
 * - survey.onComplete: Executes when the survey is completed.
 * - survey.onAfterRenderPage: Executes after a survey page is rendered.
 * - survey.onAfterRenderQuestion: Executes after every survey question is rendered.
 * - survey.onLoadChoicesFromServer: Executes when choices are loaded from URL.
 *
 * Each event handler calls a function to perform specific actions, such as:
 * 
 * - updateStringComponents - adds a tooltip with an icon to selected elements
 * - setDefaultValueFromFirstUrlOption - defaults a value to the first choice from URL
 * - setValueDynamic - sets a value of an element to a value of another element
 * - setDefaultName - sets an element defaultValue to a randomized name in run time
 * 
 * The file is organized in 4 sections:
 * 
 * Part 1 - Event Handler Functions
 * Part 2 - Creating an Instance of Survey
 * Part 3 - Attaching Handlers to Events
 * Part 4 - Rendering the Survey
 * 
 */
 
/**********************************************************************
 * Part 1 - Event Handler Functions
 * - These functions need to be defined before they are used.
 **********************************************************************/

/**
 * Sets the default value to the first value in the options loaded from a URL.
 *
 * @param {Object} sender - The survey instance.
 * @param {Object} options - Options containing the question and choices.
 */
function setDefaultValueFromFirstUrlOption(sender, options) {
    const question = options.question;
    if (question.name !== "country")
        return;
    const choices = options.choices;
    if (choices.length > 0) {
        question.defaultValue = choices[0].value;
    }
}

function updateStringComponents(sender, options) {
// The updateStringComponents method is based on this surveyJS example: 
// https://surveyjs.io/form-library/examples/change-survey-html-with-javascript/jquery#content-code
// Everything in the element title after the divider "||" is converted to tooltip.
//
// My modification includes adding an info icon and bootstrap classes to enhance user experience.
//
    const titleDivider = "||";
    options.htmlElement.querySelectorAll('.sv-string-viewer').forEach((el) => {
        const text = el.innerText;
        if (text.indexOf(titleDivider) > -1) {
            const strings = text.split(titleDivider);
            el.innerText = strings[0];
            // Create an info icon
            const infoIcon = document.createElement('span');
            infoIcon.className = 'info-icon';
            infoIcon.setAttribute('data-toggle', 'tooltip');
            infoIcon.setAttribute('data-placement', 'top');
            infoIcon.setAttribute('title', strings[1]);
            infoIcon.innerHTML = '<i class="fa fa-info-circle fa-xs"></i>';
            el.style.position = 'relative'; // Ensure the parent is positioned relatively
            el.appendChild(infoIcon);       // so that the icon is on the top
        }
    });
    $('[data-toggle="tooltip"]').tooltip(); // Initialize tooltips
}

function setValueDynamic(sender, options) {
    // set the default dynamicText to the value of the country element

    if (options.name === 'country') {
        const country = sender.getValue('country', '')
        // use defaultValue instead of value to avoid changing a non-empty element
        // survey.getQuestionByName('dynamicTextUrl').defaultValue = default_country;
        sender.getQuestionByName('dynamicTextUrl').defaultValue = country
        sender.getQuestionByName('dynamicValueUrl').value = country
    }
}

function setDefaultName(sender, options) {
    // generate a random id and set an element default value in run time
    const uuidValue = crypto.randomUUID(); // Use randomUUID() to generate UUID
    const defaultValue = "My-name-" + uuidValue.slice(-8); // Use last 8 characters
    sender.setValue('dynamicText', defaultValue);
}

/**********************************************************************
* Part 2 - Creating an Instance of Survey
* - The survey instance needs to be created before the event handlers 
*   can be attached to it. 
**********************************************************************/
const survey = new Survey.Model(json);

/**********************************************************************
/ Part 3 - Attaching Handlers to Events:
/ - Attaches the defined event handler functions to their respective 
/   SurveyJS events. Handlers must be attached to the survey instance 
/   after it has been created but before the survey is rendered.
**********************************************************************/
survey.onValueChanged.add(function(sender, options) {
    if (options.name === 'country') {
        setValueDynamic(sender, options);
    }
});

survey.onAfterRenderPage.add((sender, options) => {
    setDefaultName(survey);
});

survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
});

survey.onAfterRenderQuestion.add(updateStringComponents);

survey.onLoadChoicesFromServer.add(setDefaultValueFromFirstUrlOption);

/**********************************************************************
* Part 4 - Rendering the Survey:
* - Renders the survey in the specified HTML element using jQuery.
*   This is where the survey is actually displayed to the user. 
    All setup and configuration should be completed before this step.
***********************************************************************/

$("#surveyElement").Survey({ model: survey });

