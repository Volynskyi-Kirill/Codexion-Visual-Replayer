/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   coder_routine.c                                    :+:    :+:            */
/*                                                     +:+                    */
/*   By: kvolynsk <kvolynsk@student.codam.nl>         +#+                     */
/*                                                   +#+                      */
/*   Created: 2026/04/10 21:46:24 by kvolynsk      #+#    #+#                 */
/*   Updated: 2026/04/15 01:24:33 by kvolynsk      ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

#include "coders.h"
#include <unistd.h>

void	*coder_routine(void *arg)
{
	t_coder	*coder;

	coder = (t_coder *)arg;
	if (coder->id % 2 == 0)
		ft_sleep(5);
	while (!get_is_simulation_end(coder->data))
	{
		coder_compile(coder);
		increment_compiles_done(coder);
		if (get_is_simulation_end(coder->data))
			return (NULL);
		log_json(coder->data, "START_DEBUG", coder, NULL);
		ft_sleep(coder->data->time_to_debug);
		if (get_is_simulation_end(coder->data))
			return (NULL);
		log_json(coder->data, "START_REFACTOR", coder, NULL);
		ft_sleep(coder->data->time_to_refactor);
	}
	return (NULL);
}

/**
 * @brief Sleep for the requested duration in milliseconds.
 *
 * @param time Duration to sleep, in milliseconds.
 */
void	ft_sleep(long long time)
{
	long long	start;

	start = get_current_time();
	while (get_current_time() - start < time)
		usleep(500);
}

long long	get_timestamp(long long simulation_start_time)
{
	return (get_current_time() - simulation_start_time);
}
