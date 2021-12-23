import { combineReducers } from "redux";

import user from "./user_reducer";
import chat from "./chat_reducer";

const rootReducer = combineReducers({
	user: user,
	chat: chat,
});

export default rootReducer;
