# 2 Many Tabz

2 Many Tabs is a chrome extention that helps manage all the tabs in the browser. This chrome extention frees you from looking for a certain tab when there are tons of tabs opened in your browser. You can search, delete, manage the tab you want in a second! Whats's more, you can save those tabs you frequently use into files and go back to them the next time you open a new browser. Your preference never get lost when you close your browser!

Let's have a glympse of how this chrome extention works!

## Work flow and updates
5.19 update( A prototype):
![prototype](other_img/1.png)

5.20 MockUp(UI design)
![UI](other_img/UI_design/1.png)
![UI](other_img/UI_design/2.png)
![UI](other_img/UI_design/3.png)
![UI](other_img/UI_design/4.png)
![UI](other_img/UI_design/5.png)
![UI](other_img/UI_design/6.png)
![UI](other_img/UI_design/7.png)


## Architecture

In this part, we will explain how did our team split things up and collaborate with each other.
![architecture](other_img/3.jpeg)

In general, we have three teams each working on a specific task.

### Task 1: UI 
Responsibility: 
* design popup UI (finished)
* implement the popup interface
* cooperate with the other 2 teams.


### Task 2: Tab management
Responsibility:
* offer tab management api methods(basically developed from chrome.tabs)
* interact with all the tab changes in the chrome browser
* offer tab information to the server team and UI team
* There are five methods that can be leveraged by the UI and Server teams.

#### Methods we've implemented:
1. list all the tabs information in the browser(this method is offered for the UI team).
2. jump to method: if you click the tab, it will direct to the corresponding tab in the chrome(this method is offered for the UI team)
3. close method: delete tabs you don't want(this method is offered for the UI team)
4. open tab: facilitate the history data to be opened in the chrome browser. In general, The history data are stored in different project folders, each time we want to open one tab, this method can help open the current tab in the chrome browser(this method is for the server team and UI team).
5. open tabs: this method is also for the server team. This method can opens all the tabs in one project folder(this method is for the server team and UI team).

### Task 3: Server
Responsibility:
* User Auth
* Database
* collaborate with the other teams

### Front-end: 
#### App
  * Routing to 3 pages and a modal
  * A footer to control login status

#### TabManager:  
  What works:
  * TabView
    * Filter tabs according to title
    * Switch between grid view and list view
    * Show the screenshot for the grid view
    * Click to go to a tab
    * Click to close a tab
    * Drag a tab to a project
  * PojectList:
    * Show projectlist (projectName + tabName + and n other tabs)
    * Project with tabs that fullfill the filter would be assigned to a class: fits-filter 
    * Switch active project (class : choosen)
    * Create a new project (check if the name exists)

  Todo:
    * Error display for creating project
    * A better UI

#### ProjectDetail:
  What works:
  * ProjectEditor:
    * Edit the name and note of a project
  * TabView:
    * Basicly the same as tab manager (open/close), but can not drag a tab
    * Add a tab to current project
  * ResourceView:
    * Filter: select box + input, filter by tab or title
    * OpenAll: open all the tabs that fits the filter
    * Open one tab: by clicking a resource
    * Update the resource: when the title and icon of the resource doesn't match the tab with same url
    * Resource: Display the title and tags of a resource
    * Click the down button to show detail of the resource and edit the tags
    * Bluring event would upload the change of the tags
    * Delete the resource
  * Delete Project:
    * Delete project and go back to tab manager if succeed

  Todo: 
  * handle error

#### Login  
  What works:
  * Basic UI with two input boxes and a button
  * Click button to the synchronize modal

  Todo:
  * Get input values
  * Actually log in functions (and maybe also sign in)
  * Log in reducer
  * A better UI

#### Modal
  Recently we only have one synchronize modal
  What works:
  * Click the background to close the modal and go back
  
  ##### Synchronize modal
    * To switch the synchronize status
    * When synchronize is choosen, wait for synchronizing

### Store
* For the front end, data is stored in the background
* Pop up page use actions (redux for chrome would send them as messages) to change data in store 
* Several listeners are added to listen to tab update/ activate / remove events
* Since direct communication (through stringified js objects, could not convey functions) can not handle promises or handle error, we use aliases to conduct actions in background pages
* Data in store:
```js
const initialState = {
  tabs: {
    tabList: {}, 
    activeTab: -1,
    activeWindow: -1,
    movingTab: null,
  },
  projects: {
    projectList: loadProjectList(), // An array of projects, Load from local storage
    currentProject: JSON.parse(Values.emptyProject), // { projectName: '', projectNote: '', resources: {} },
    activeProj: Values.defaultProject,
    error: '',
    synchronizing: 0, 
  },
  preferences: loadPreferences(), 
  // displayType: 0 -> ListView, 1 -> GridView
  // synchronize: -1 -> unknown, 0 -> don't synchronize, 1 -> synchronize
  auth: {
    authenticated: false,
    userName: '', 
    error: '',
  },  
};
```
A listener is added to store. If the state of store has been changed, write the new preferences to local storage. If has been logged in and not using synchronize, would not update project info, otherwise write the new project list and new current project

### Communicate with Backend

* Methods are defined in src/modules/ajax.js
* Methods are called from src/background/aliases4project;  
  Could refer to local methods for inspiration!
     
### Back-end: 

 * Tab Model
     * Opened At  
     // 'Open at' time of a tab is not provided by chrome.tabs, so PLZ get rid of it for now!  
     * URL
     * Name
     * Tags 
     * Custom Notes  
     // Don't have this info, and maybe not necessary? 
 * Project/Folder Model
     * Name
     * List of tabs
     * Custom Notes
 * User model?
     * Definitely don't want on front-end, should be able to derive info from computer/browser..


## Setup
Because this is an extension, prior to publication on the Chrome webstore, users need to do a teeny bit of work to view the extension for themselves (as opposed to having an already-hosted web application).
* First, make sure to clone this repo with `git clone https://github.com/dartmouth-cs52-20S/project-2-many-tabz.git` in a directory of your choice. 
* Next, simply fire up Chrome and navigate to [chrome://extensions/](chrome://extensions/). 
* Ensure Developer Mode is activated (click the radio button at the top right of this page).
<!-- * Click the Load Unpacked button, and select the /src folder of this github repository. -->
<!-- Then We'll do something different to use react！  -->
* Enter the project-2-many-tabs folder, do yarn install.
* Do yarn build (if you are using Windows system, do yarn winbuild)
* Click the Load Unpacked button, and select the /dist folder of this github repository.
<!-- Then the same -->
* Turn on the extension by clicking the blue radio button at the bottom right corner of the extension box.
* Click the refresh icon on the extension box anytime you pull a new update from this repository. Turn on the extension by clicking the blue radio button at the bottom right corner of the extension box.
* Click the refresh icon on the extension box anytime you pull a new update from this repository.

## Deployment
Once you've finished the above, just click the new 2ManyTabs icon in your chrome window to pull up our beauiful UI and interact with the app!


## Authors
* Yaorui Zhang
* Jialing Wu
* Katherine Taylor
* Jackson Harris
* Nathan Albrinck
* Yunjin Tong
  
## Acknowledgments


### References:

Redux for Chrome Extensions:
https://thoughtbot.com/blog/redux-for-chrome-extensions
(Super useful!!)
