const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paybillValidation = require('../../validations/paybill.validation');
const paybillController = require('../../controllers/paybill.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('managePayBills'), validate(paybillValidation.createPayBill), paybillController.createPayBill)
  .get(auth('getPayBills'), validate(paybillValidation.getPayBills), paybillController.getPayBills);

router
  .route('/:Id')
  .get(auth('getPayBills'), validate(paybillValidation.getPayBill), paybillController.getPayBill)
  .patch(auth('managePayBills'), validate(paybillValidation.updatePayBill), paybillController.updatePayBill)
  .delete(auth('managePayBills'), validate(paybillValidation.deletePayBill), paybillController.deletePayBill);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: PayBills
 *   description: PayBill management and retrieval
 */

/**
 * @swagger
 * /paybills:
 *   post:
 *     summary: Create a pay bill
 *     description: -.
 *     tags: [PayBills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userid
 *               - billid
 *               - currency
 *               - amount
 *             properties:
 *               userid:
 *                 type: string
 *               billid:
 *                 type: string
 *               currency:
 *                 type: string
 *               amount:
 *                  type: number
 *             example:
 *               userid: 620c875bf7df58130610b9b5
 *               billid: pln12345
 *               currency: IDR
 *               amount: 2000
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PayBill'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all paybills
 *     description: .
 *     tags: [PayBills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: billid
 *         schema:
 *           type: string
 *         description: Bill ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PayBill'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /paybills/{id}:
 *   get:
 *     summary: Get a pay bill
 *     description: 
 *     tags: [PayBills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pay Bill Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PayBill'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a pay bill 
 *     description: .
 *     tags: [PayBills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pay Bill Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               billid:
 *                 type: string
 *               currency:
 *                 type: string
 *               amount:
 *                 type: string
 *             example:
 *               userid: 620c875bf7df58130610b9b5
 *               billid: pln12345
 *               currency: IDR
 *               amount: 2000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PayBill'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a paybill
 *     description: 
 *     tags: [PayBills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pay Bill id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
