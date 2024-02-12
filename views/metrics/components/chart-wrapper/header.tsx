import { Box, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { ChartHeaderProps } from './chart.types';

const ChartHeader: FC<ChartHeaderProps> = ({
  title,
  filters,
  resume,
  isLoading,
}) => {
  const [selectedTagIndex, setSelectedTagIndex] = useState(
    filters?.map((item) => item.isSelected).lastIndexOf(true)
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" px="xl">
        <Typography
          variant="title"
          size="large"
          fontSize={['3xl', '3xl', '3xl', '5xl', '5xl']}
        >
          {title}
        </Typography>
        {filters && (
          <Box display="flex" gap="xs">
            {filters.map(({ label, onClick }, index) => (
              <Tag
                variant="filled"
                bg={
                  index === selectedTagIndex ? 'primary' : 'rgba(0, 0, 0, 0.08)'
                }
                color={selectedTagIndex === index ? 'lowestContainer' : 'unset'}
                nHover={{
                  bg: 'primary',
                  color: 'lowestContainer',
                }}
                key={v4()}
                onClick={() => {
                  setSelectedTagIndex(index);
                  onClick();
                }}
              >
                {label}
              </Tag>
            ))}
          </Box>
        )}
      </Box>
      {resume && (
        <Box px="xl" mt="xl">
          {isLoading ? (
            <>
              <Skeleton width="20%" height="2rem" />
              <Skeleton width="30%" height="1rem" />
            </>
          ) : (
            <>
              <Typography variant="title" size="large">
                {resume.amount}
              </Typography>
              <Typography variant="body" size="small">
                {resume.description}
              </Typography>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default ChartHeader;
