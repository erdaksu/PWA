const express = require('express')
const router = express.Router()
const Courses = require ('../models/courses')

//getting all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Courses.find()
        res.json(courses)
    }catch (err) {
        res.status(500).json({ message: err.message})
    }
})
//getting all courses created by a provider
router.get('/:provider', async (req, res) => {
    try {
        const courses = await Courses.find()
        res.json(courses)
    }catch (err) {
        res.status(500).json({ message: err.message})
    }
})
//getting one course
router.get('/:id', getCourses, (req, res) => {
    res.json(res.courses.topic)   
})
//creating a course
router.post('/', async (req, res) => { 
       const courses = new Courses({
           topic: req.body.topic,
           location: req.body.location,
           price: req.body.price,
           provider: req.body.provider,
           review: req.body.review,
           author: req.body.author,
       })
       try {
           const newCourses = await courses.save()
           res.status(201).json(newCourses)
       } catch (err) {
        res.status(400).json({ message: err.message})
       }
})
//updating a course
router.patch('/:id', getCourses, async (req, res) => {    
    if (req.body.topic != null) {
        res.courses.topic = req.body.topic
    }
    if (req.body.location != null) {
        res.courses.location = req.body.location
    }
    if (req.body.price != null) {
        res.courses.price = req.body.price
    }
    if (req.body.provider != null) {
        res.courses.provider = req.body.provider
    }
    if (req.body.review != null) {
        res.courses.review = req.body.review
    }
    if (req.body.author != null) {
        res.courses.author = req.body.author
    }
    try {
        const updatedCourses = await res.courses.save()
        res.json(updatedCourses)
    }catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//deleting a course
router.delete('/:id', getCourses, async(req, res) => {
    try {
        await res.courses.remove()
        res.json({ message: 'deleted a course'})
    }catch (err) {
        res.status(500).json({ message: err.message})
       }

})

//deleting all course
router.delete('/', async (req, res) => {
    try {
        const courses = await Courses.remove()
        res.json({ message: 'deleted all course'})
    }catch (err) {
        res.status(500).json({ message: err.message})
    }
})

async function getCourses(req, res, next) {
    let courses
    try {
        courses = await Courses.findById(req.params.id)
        if (courses == null) {
            return res.status(404).json({ message: 'cant find a course'})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }
    res.courses = courses
    next()
}

module.exports = router