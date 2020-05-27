'using strict';

// eslint-disable-next-line no-unused-vars
const ProjectList = (props) => {
  const {
    projects, tabs, switchProject, dragOutTab, movingTab,
  } = props;
  const tabMap = {};
  projects.forEach((project) => {
    tabMap[project] = [];
  });
  Object.values(tabs).forEach((tab) => {
    tabMap[tab.project].push(tab);
  });
  const projectLi = Object.keys(tabMap).map((project) => {
    return e(Project, {
      title: project, tabs: tabMap[project], switchProject, dragOutTab, movingTab,
    });
  });
  return e('ul', null, ...projectLi);
};
