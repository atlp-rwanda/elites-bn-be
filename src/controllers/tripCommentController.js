/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import { findAtrip } from '../services/tripServices';
import { TripCommentService } from '../services/tripCommentServices';
import { PageNotFoundError } from '../httpErrors/pageNotFoundError';
import { ForbbidenError } from '../httpErrors/forbidenError';
import requestEventEmitter from './notificationEventsController';
import { BaseError } from '../httpErrors/baseError';

export class TripCommentController {
  static async create(id, req, res, next) {
    try {
      const trip = await findAtrip(parseInt(req.params.id));
      if (trip) {
        if (trip.managerId === id || trip.userId === id) {
          const createdComment = await TripCommentService.create({
            userId: id,
            tripId: parseInt(req.params.id),
            comment: req.body.comment,
          });
          if (createdComment) {
            // Emit event when the trip request is commented on
            await requestEventEmitter.emit(
              'commented-on-request',
              createdComment,
              req,
            );
            return res.status(201).json({
              status: '201',
              message: 'comment added successfully',
              payload: createdComment,
            });
          }
        }
        throw new ForbbidenError(
          'You are neither a manager nor owner of this trip',
        );
      } else {
        throw new PageNotFoundError(`Trip with id: ${req.params.id} not found`);
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(id, req, res, next) {
    try {
      const tripComment = await TripCommentService.findByPk(
        parseInt(req.params.id),
      );
      if (tripComment) {
        if (tripComment.userId === id) {
          const row = TripCommentService.delete(tripComment.id);
          return res.status(200).json({
            status: '200',
            message: 'comment deleted successfully',
            payload: row,
          });
        }
        throw new ForbbidenError('"You are not the own of this comment"');
      } else {
        throw new BaseError('NOT FOUND', 404, 'Comment not found');
      }
    } catch (error) {
      next(error);
    }
  }

  static async findAllByTrip(id, req, res, next) {
    try {
      const trip = await findAtrip(parseInt(req.params.id));
      if (trip) {
        if (trip.managerId === id || trip.userId === id) {
          const tripComments = await TripCommentService.findAllByTrip(trip.id);
          return res.send(tripComments);
        }
        throw new ForbbidenError('"You are not related to this trip"');
      } else {
        throw new BaseError('Not found', 404, `Trip with id: ${req.params.id} not found`);
      }
    } catch (error) {
      next(error);
    }
  }
}
