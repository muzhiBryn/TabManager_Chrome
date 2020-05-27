'using strict';

// eslint-disable-next-line no-unused-vars
const Project = (props) => {
  const { switchProject, title } = props;
  return e('li', { onClick: () => { switchProject(title); } }, title);
};
