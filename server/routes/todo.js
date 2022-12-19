const express = require('express');
const { Todo } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('메인 페이지');
});

// GET /api/todos - show all todos (READ)
router.get('/todos', async (req, res) => {
  try {
    let todos = await Todo.findAll();
    res.send(todos);
  } catch (err) {
    res.send(err);
  }
});

// GET /api/todo/:todoId - show a specific todo (READ ONE)
// router.get('/todo/:todoId', async (req, res) => {
//   try {
//     let todo = await Todo.findOne({
//       where: {
//         id: { [Op.eq]: req.params.todoId },
//       },
//       // raw: true,
//     });
//     // 조회 결과 없음
//     if (todo === null) {
//       return res.send(false);
//     }
//     res.send(todo);
//   } catch (err) {
//     res.send(err);
//   }
// });

// POST /api/todo - create a new todo (CREATE)
router.post('/todo', async (req, res) => {
  console.log('>>>>', req.body);
  try {
    let newTodo = await Todo.create({
      title: req.body.title,
      done: false, // todoItem 추가시 false가 기본 값
    });
    console.log(newTodo);
    res.send(newTodo);
  } catch (err) {
    res.send(err);
  }
});

// PATCH /api/todo/:todoId - edit a specific todo (UPDATE)
router.patch('/todo/:todoId', async (req, res) => {
  console.log(req.body);
  try {
    // 배열 구조 분해
    // [isUpdated] = [ 0 ] or [ 1 ]
    let [idUpdated] = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: { [Op.eq]: req.params.todoId },
        },
        // raw: true,
      }
    );
    // console.log(idUpdated); // 0 or 1
    // 수정 실패
    if (idUpdated === 0) {
      return res.send(false);
    }
    // 수정 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

// DELETE /api/todo/:todoId - remove a specific todo (DELETE)
router.delete('/todo/:todoId', async (req, res) => {
  try {
    let isDeleted = await Todo.destroy({
      where: {
        id: { [Op.eq]: req.params.todoId },
      },
      raw: true,
    });
    // console.log(isDeleted); // 0 or 1
    // 삭제 실패
    if (!isDeleted) {
      return res.send(false);
    }
    // 삭제 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
