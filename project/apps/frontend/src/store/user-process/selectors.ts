import { NameSpace } from '../../common';
import { TState } from '../../common';
import { AuthorizationStatus } from '../../common';
import { TUserIds } from './user-process';

const selectAuthStatus = (state: Pick<TState, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

const selectIsAuthStatus = (state: Pick<TState, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.NoAuth;

const selectUserIds = (state: Pick<TState, NameSpace.User>): TUserIds => state[NameSpace.User].userIDs;

export { selectAuthStatus, selectIsAuthStatus, selectUserIds };
