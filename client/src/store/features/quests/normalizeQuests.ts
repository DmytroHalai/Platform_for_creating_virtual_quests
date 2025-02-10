import ICategory from '../../../types/category';
import IQuest from '../../../types/quest';
import IRating from '../../../types/rating';
import ITask from '../../../types/task';
import IUser from '../../../types/user';
import NormalizedState from '../../../types/store';

interface NormalizedQuests {
  quests: NormalizedState<IQuest>;
  users: NormalizedState<IUser>;
  categorys: NormalizedState<ICategory>;
  ratings: NormalizedState<IRating>;
  tasks: NormalizedState<ITask>;
}

export function normalizeQuests(data: any): NormalizedQuests {
  const quests: NormalizedState<IQuest> = { byId: {}, allIds: [] };
  const users: NormalizedState<IUser> = { byId: {}, allIds: [] };
  const categorys: NormalizedState<ICategory> = { byId: {}, allIds: [] };
  const ratings: NormalizedState<IRating> = { byId: {}, allIds: [] };
  const tasks: NormalizedState<ITask> = { byId: {}, allIds: [] };

  data.forEach((item: any) => {
    const {
      id,
      author,
      category,
      rating,
      tasksIds,
      ...rest
    }: {
      id: number;
      author: { id: number; username: string };
      category: { id: number; name: string };
      rating: { id: number; rating: number }[];
      tasksIds: number[];
    } = item;

    quests.byId[id] = {
      id,
      authorId: author.id,
      categoryId: category.id,
      ratingsIds: ratings.map((item) => item.id),
      tasksIds: tasksIds,
      ...rest,
    };
    quests.allIds.push(id);

    users.byId[author.id] = {
      id: author.id,
      username: author.username,
    };
    users.allIds.push(author.id);

    categorys.byId[category.id] = {
      id: category.id,
      name: category.name,
    };
    categorys.allIds.push(category.id);

    categorys.byId[category.id] = {
      id: category.id,
      name: category.name,
    };
    categorys.allIds.push(category.id);

    rating.forEach((item) => {
      ratings.byId[item.id] = {
        id: item.id,
        rating: item.rating,
      };
      ratings.allIds.push(item.id);
    });

    tasksIds.forEach((taskId) => {
      tasks.byId[taskId] = { id: taskId };
      tasks.allIds.push(taskId);
    });
  });

  return { quests, users, categorys, ratings, tasks };
}
