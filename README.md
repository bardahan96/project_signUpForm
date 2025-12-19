# project_signUpForm
Sign-up form built with **Vanilla JavaScript, HTML, and CSS**

## 1. Responsive
The form is responsive across multiple screen sizes.  
While reviewing the Figma design, I noticed cases where single words appear on their own line. I matched this behavior where required by the design. In general, text wrapping was handled to avoid isolated words when possible.

## 2. Custom Select
A custom select component was created to fully control the visual design of the options.  
New CSS features were tested to style the native scrollbar, but since browser support is still limited, they are not relied on as a core solution.

## 3. Tooltip
Tooltips were added to form fields and are triggered when a required input is not filled.  
All inputs are marked as required by default, and the tooltip is styled using basic CSS.

## 4. Form Data
At this stage, the submitted form data is logged to the console using `console.log` for testing and development purposes.

