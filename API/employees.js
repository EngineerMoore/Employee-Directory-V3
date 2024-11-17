const prisma = require(`../prisma`);
const express = require(`express`);
const router = express.Router();
module.exports = router;

router.get(`/`, async (req, res, next) => {
  try{
    const employee = await prisma.employee.findMany();
    res.status(200);
    res.json(employee);
  } catch(err) {
    next(err);
  }
})

router.post(`/`, async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    next({
      status: 400,
      message: `Name required to add a new employee.`
    })
  }
  try {
    const employee = await prisma.employee.create({ data: {name}});
    res.status(201);
    res.json(employee);
  } catch(err){
    next(err);
  }
})

router.put(`/:id`, async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name){
    next({
      status: 400,
      message: `Name required to add a new employee.`
    });
  }
  try {
    const employee = await prisma.employee.findUnique({ where: {id: +id} });
    if (!employee){
      next({
        status: 404,
        message: `Employee ${id} does not exist.`
      });
    }
    const updatedEmployee = await prisma.employee.update({
      where: {id: +id},
      data: {name},
    });
    res.status(200).json(updatedEmployee);
    next({ status: 400, message: `name required`})
  } catch(err){
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({ where: {id: +id}});
    if (!employee){
      next({
        status: 404,
        message: `Employee ${id} does not exist.`
      })
    }
    await prisma.employee.delete({ where: {id: +id} });
    res.sendStatus(204);
  } catch(err){
    next(err);
  }
})