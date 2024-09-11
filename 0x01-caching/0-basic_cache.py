#!/usr/bin/env python3
"""
Basic dictionary
"""


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    '''
    caching system class that inherits from `BaseCaching`
    '''

    def put(self, key, item):
        '''
        assigns to `self.cache_data` a
        key value pair
        '''
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        '''
        returns the value in `self.cache_data` for the specified`key`
        '''

        return self.cache_data.get(key, None)
