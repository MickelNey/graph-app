import React from "react";
import {Route, Routes} from "react-router-dom";
import { Drafts, CreateDraft, SingleDraft } from "../../pages";


export const AuthRoutes = () => (
    <Routes>
        <Route path='/' element={<Drafts />}></Route>
        <Route path='/create' element={<CreateDraft />}></Route>
        <Route path='/draft/:id' element={<SingleDraft />}></Route>
    </Routes>
)

