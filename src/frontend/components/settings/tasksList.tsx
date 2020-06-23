import { Fragment, FunctionalComponent, h } from 'preact';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { Headline2, Button, Icon } from '../../../components';
import { i } from '../../i18n/i18n';
import { isTouched } from '../../utils/form';
import { tasksQuery } from '../../queries/settings.gql';
import { TaskCategory, TaskStatusMessage } from '../../../tasks/task/type';
import { movieDetailRoute } from '../../utils/route';
import {
  TaskEntryCategory,
  TaskEntryControls,
  TaskEntryDetails,
  TaskEntryParameters,
  TaskEntryStatus,
  TaskList,
  TaskListEntry,
} from '../../../components/compositions/taskList';
import { cancelTaskMutation, restartTaskMutation } from '../../mutations/tasks.gql';

const TaskStatus: FunctionalComponent<{ status: TaskStatus }> = ({ status }) => {
  if (status === 'ERROR') {
    return (
      <Fragment>
        <Icon icon="error" />
        {i('TASK_ERROR')}
      </Fragment>
    );
  }
  if (status === 'RUNNING') {
    return (
      <Fragment>
        <Icon icon="settings" />
        {i('TASK_RUNNING')}
      </Fragment>
    );
  }
  if (status === 'PENDING') {
    return (
      <Fragment>
        <Icon icon="access_alarm" />
        {i('TASK_PENDING')}
      </Fragment>
    );
  }

  return null;
};

const TaskView: FunctionalComponent<{ task: TasksQuery['tasks'][number] }> = ({
  task: { id, category, parameters, status, statusMessage },
}) => {
  const [restartTask] = useMutation<RestartTaskMutation, RestartTaskMutationVariables>(
    restartTaskMutation,
    {
      variables: {
        taskId: id,
      },
    },
  );
  const [cancelTask] = useMutation<CancelTaskMutation, CancelTaskMutationVariables>(
    cancelTaskMutation,
    {
      variables: {
        taskId: id,
      },
    },
  );
  const params = JSON.parse(parameters || '{}');

  return (
    <TaskListEntry>
      <TaskEntryCategory>{i(category as TaskCategory)}</TaskEntryCategory>
      <TaskEntryParameters>
        {category === 'TAKE_SCREENCAPS' && params?.movie?.title && params?.movie?.id ? (
          <a href={movieDetailRoute(params.movie.id)}>{params.movie.title}</a>
        ) : null}
      </TaskEntryParameters>
      <TaskEntryStatus>
        <TaskStatus status={status} />
      </TaskEntryStatus>
      {status === 'ERROR' ? (
        <TaskEntryControls>
          <Button
            onClick={() => {
              restartTask().then(() => {
                toast.success(i('TASK_RESTART_SUCCESS'));
              });
            }}
          >
            {i('TASK_RESTART')}
          </Button>
          <Button
            appearance="inverted"
            onClick={() => {
              cancelTask();
            }}
          >
            {i('TASK_CANCEL')}
          </Button>
        </TaskEntryControls>
      ) : status === 'PENDING' ? (
        <TaskEntryControls>
          <Button
            appearance="inverted"
            onClick={() => {
              cancelTask();
            }}
          >
            {i('TASK_CANCEL')}
          </Button>
        </TaskEntryControls>
      ) : null}
      {status !== 'ERROR' ? null : (
        <TaskEntryDetails>{i(statusMessage as TaskStatusMessage)}</TaskEntryDetails>
      )}
    </TaskListEntry>
  );
};

export const TasksList: FunctionalComponent = () => {
  const { data, loading } = useQuery<TasksQuery>(tasksQuery, {
    pollInterval: 1000,
  });

  return loading || !data ? null : (
    <div>
      <Headline2>{i('SETTINGS_TASKS')}</Headline2>
      <TaskList>
        {data.tasks.map(task => (
          <TaskView task={task} />
        ))}
      </TaskList>
    </div>
  );
};
