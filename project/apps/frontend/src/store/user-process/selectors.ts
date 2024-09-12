import { NameSpace } from '../../common';
import { TState } from '../../common';
import { AuthorizationStatus } from '../../common';

const selectAuthStatus = (state: Pick<TState, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

const selectIsAuthStatus = (state: Pick<TState, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.NoAuth;

export { selectAuthStatus, selectIsAuthStatus };
