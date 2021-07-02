import { request, Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categryAlreadyExists = categoriesRepository.findByName(name);

    if (categryAlreadyExists) {
        return response.status(400).json({ erro: "Category already exists!" });
    }

    categoriesRepository.create({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list();

    return response.json(all);
})

export { categoriesRoutes }