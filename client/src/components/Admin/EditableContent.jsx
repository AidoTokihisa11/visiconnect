import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import styled from 'styled-components';
import { Pencil } from 'lucide-react';

const EditWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .edit-indicator {
    opacity: 1;
  }

  &.editing {
    outline: 2px dashed #2563eb;
    background: rgba(37, 99, 235, 0.1);
    border-radius: 4px;
    padding: 2px;
  }
`;

const EditIndicator = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  background: #2563eb;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 12px;
  pointer-events: none;
  z-index: 50;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  resize: none;
  outline: none;
`;

export const EditableText = ({
  id,
  defaultValue,
  children,
  type = 'text',
  translationKey,
  as: Component = 'span',
  className,
  ...props
}) => {
  const { isLiveEdit, contentMap, updateContent, updateTranslation, t } = useAdmin();

  // Determine initial value logic
  const getInitialValue = () => {
    if (translationKey) {
      return t(translationKey, defaultValue || children);
    }
    return contentMap[id] || defaultValue || children;
  };

  const [value, setValue] = useState(getInitialValue());

  useEffect(() => {
    setValue(getInitialValue());
  }, [children, contentMap, translationKey, t, id, defaultValue]);

  if (!isLiveEdit) {
    return (
      <Component className={className} {...props}>
        {getInitialValue()}
      </Component>
    );
  }

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (translationKey) {
      updateTranslation(translationKey, newValue);
    } else {
      updateContent(id, newValue);
    }
  };

  return (
    <EditWrapper className={isLiveEdit ? 'editing' : ''}>
      <EditIndicator className="edit-indicator">
        <Pencil size={12} />
      </EditIndicator>
      {type === 'textarea' ? (
        <TextArea value={value} onChange={handleValueChange} className={className} {...props} />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          className={className}
          style={{
            width: '100%',
            border: 'none',
            background: 'transparent',
            color: 'inherit',
            font: 'inherit',
            outline: 'none',
          }}
          {...props}
        />
      )}
    </EditWrapper>
  );
};
